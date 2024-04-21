export function statement(invoice: any, movies: any): string {
    let totalAmount = 0;
    let frequentRenterPoints = 0;
    let result = "Rental Record for " + invoice.customer + "\n";

    for (const each of invoice.rentals) {
        const movie = movies[each.movie];
        let thisAmount = 0;

        // determine amounts for each line
        switch (movie.category) {
            case "regular":
                thisAmount += 2;
                if (each.daysRented > 2) {
                    thisAmount += (each.daysRented - 2) * 1.5;
                }
                break;
            case "new release":
                thisAmount += each.daysRented * 3;
                break;
            case "children":
                thisAmount += 1.5;
                if (each.daysRented > 3) {
                    thisAmount += (each.daysRented - 3) * 1.5;
                }
                break;
        }

        // add frequent renter points
        frequentRenterPoints++;
        // add bonus for a two day new release rental
        if ((movie.category === "new release") && each.daysRented > 1)
            frequentRenterPoints++;

        // show figures for this rental
        result += "\t" + movie.title + "\t" + thisAmount.toFixed(1) + "\n";
        totalAmount += thisAmount;
    }

    // add footer lines
    result += "Amount owed is " + totalAmount.toFixed(1) + "\n";
    result += "You earned " + frequentRenterPoints + " frequent renter points";

    return result;
}