export function statement(invoice: any, movies: any): string {
    return renderPlainText(createStatementData(invoice, movies));
}

export function createStatementData(invoice: any, movies: any): string {
    const statementData = {} as any;
    statementData.customer = invoice.customer;
    statementData.rentals = invoice.rentals.map(enrichRental);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalFrequentRenterPoints = totalFrequentRenterPoints(statementData);
    return statementData;

    function enrichRental(rental: any) {
        const result = {...rental};
        result.movie = movieFor(result);
        result.amount = amountFor(result);
        result.frequentRenterPoints = frequentRenterPointsFor(result);
        return result;
    }

    function movieFor(rental: any) {
        return movies[rental.movie];
    }

    function amountFor(rental: any) {
        let result = 0;

        // determine amounts for rental line
        switch (rental.movie.category) {
            case "regular":
                result += 2;
                if (rental.daysRented > 2) {
                    result += (rental.daysRented - 2) * 1.5;
                }
                break;
            case "new release":
                result += rental.daysRented * 3;
                break;
            case "children":
                result += 1.5;
                if (rental.daysRented > 3) {
                    result += (rental.daysRented - 3) * 1.5;
                }
                break;
        }
        return result;
    }

    function frequentRenterPointsFor(rental: any) {
        let result = 1;
        // add bonus for a two day new release rental
        if ((rental.movie.category === "new release") && rental.daysRented > 1)
            result++;
        return result;
    }

    function totalAmount(data: any) {
        return data.rentals.reduce((total: number, rental: any) => total + rental.amount, 0);
    }

    function totalFrequentRenterPoints(data: any) {
        return data.rentals.reduce((total: number, rental: any) => total + rental.frequentRenterPoints, 0);
    }
}

export function renderPlainText(data: any): string {
    let result = "Rental Record for " + data.customer + "\n";
    
    for (const rental of data.rentals) {
        result += "\t" + rental.movie.title + "\t" + rental.amount.toFixed(1) + "\n";
    }
    
    // add footer lines
    result += "Amount owed is " + data.totalAmount.toFixed(1) + "\n";
    result += "You earned " + data.totalFrequentRenterPoints + " frequent renter points";

    return result;
}