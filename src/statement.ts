export function statement(invoice: any, movies: any): string {
    let totalAmount = 0;
    let frequentRenterPoints = 0;
    let result = "Rental Record for " + invoice.customer + "\n";

    for (const rental of invoice.rentals) {

        // add frequent renter points
        frequentRenterPoints++;
        // add bonus for a two day new release rental
        if (((movieFor(rental)).category === "new release") && rental.daysRented > 1)
            frequentRenterPoints++;

        // show figures for this rental
        result += "\t" + (movieFor(rental)).title + "\t" + (amountFor(rental)).toFixed(1) + "\n";
        totalAmount += amountFor(rental);
    }

    // add footer lines
    result += "Amount owed is " + totalAmount.toFixed(1) + "\n";
    result += "You earned " + frequentRenterPoints + " frequent renter points";

    return result;

    function amountFor(rental: any) {
        let result = 0;

        // determine amounts for rental line
        switch ((movieFor(rental)).category) {
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

    function movieFor(rental: any) {
        return movies[rental.movie];
    }
}