export function statement(invoice: any, movies: any): string {
    const statementData = {} as any;
    statementData.customer = invoice.customer;
    statementData.rentals = invoice.rentals.map(enrichRental);
    return renderPlainText(statementData);

    function enrichRental(rental: any) {
        const result = {...rental};
        result.movie = movieFor(result);
        result.amount = amountFor(result);
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
}

export function renderPlainText(data: any): string {
    let result = "Rental Record for " + data.customer + "\n";
    
    for (const rental of data.rentals) {
        result += "\t" + rental.movie.title + "\t" + rental.amount.toFixed(1) + "\n";
    }
    
    // add footer lines
    result += "Amount owed is " + totalAmount().toFixed(1) + "\n";
    result += "You earned " + totalFrequentRenterPoints() + " frequent renter points";

    return result;

    function totalAmount() {
        let totalAmount = 0;
        for (const rental of data.rentals) {
            totalAmount += rental.amount;
        }
        return totalAmount;
    }

    function totalFrequentRenterPoints() {
        let frequentRenterPoints = 0;
        for (const rental of data.rentals) {
            frequentRenterPoints += frequentRenterPointsFor(rental);
        }
        return frequentRenterPoints;
    }

    function frequentRenterPointsFor(rental: any) {
        let result = 1;
        // add bonus for a two day new release rental
        if ((rental.movie.category === "new release") && rental.daysRented > 1)
            result++;
        return result;
    }
}