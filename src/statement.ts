export function statement(invoice: any, movies: any): string {
    let totalAmount = 0;
    let frequentRenterPoints = 0;
    let result = "Rental Record for " + invoice.customer + "\n";

    for (const rental of invoice.rentals) {
        let thisAmount = 0;

        // determine amounts for rental line
        switch ((movieFor(rental)).category) {
            case "regular":
                thisAmount += 2;
                if (rental.daysRented > 2) {
                    thisAmount += (rental.daysRented - 2) * 1.5;
                }
                break;
            case "new release":
                thisAmount += rental.daysRented * 3;
                break;
            case "children":
                thisAmount += 1.5;
                if (rental.daysRented > 3) {
                    thisAmount += (rental.daysRented - 3) * 1.5;
                }
                break;
        }

        // add frequent renter points
        frequentRenterPoints++;
        // add bonus for a two day new release rental
        if (((movieFor(rental)).category === "new release") && rental.daysRented > 1)
            frequentRenterPoints++;

        // show figures for this rental
        result += "\t" + (movieFor(rental)).title + "\t" + thisAmount.toFixed(1) + "\n";
        totalAmount += thisAmount;
    }

    // add footer lines
    result += "Amount owed is " + totalAmount.toFixed(1) + "\n";
    result += "You earned " + frequentRenterPoints + " frequent renter points";

    return result;

    function movieFor(rental: any) {
        return movies[rental.movie];
    }
}