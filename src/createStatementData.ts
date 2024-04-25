export type StatementData = {
    customer: string;
    rentals: {
        movie: {
            title: string;
            category: string;
        };
        daysRented: number;
        amount: number;
        frequentRenterPoints: number;
    }[];
    totalAmount: number;
    totalFrequentRenterPoints: number;
};

export function createStatementData(invoice: any, movies: any): StatementData {
    const statementData = {} as StatementData;
    statementData.customer = invoice.customer;
    statementData.rentals = invoice.rentals.map(enrichRental);
    statementData.totalAmount = totalAmount(statementData);
    statementData.totalFrequentRenterPoints = totalFrequentRenterPoints(statementData);
    return statementData;

    function enrichRental(rental: any) {
        const result = { ...rental };
        result.movie = movieFor(result);
        result.amount = amountFor(result);
        result.frequentRenterPoints = frequentRenterPointsFor(result);
        return result;
    }

    function movieFor(rental: { movie: string}) {
        return movies[rental.movie];
    }

    function amountFor(rental: { movie: { category: string }, daysRented: number}) {
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

    function frequentRenterPointsFor(rental: { movie: { category: string }, daysRented: number }) {
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
