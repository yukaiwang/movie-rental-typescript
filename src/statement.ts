export function statement(invoice: any, movies: any): string {
    return renderPlainText(invoice, movies);
}

export function renderPlainText(invoice: any, movies: any): string {
    let result = "Rental Record for " + invoice.customer + "\n";
    
    for (const rental of invoice.rentals) {
        result += "\t" + (movieFor(rental)).title + "\t" + (amountFor(rental)).toFixed(1) + "\n";
    }
    
    // add footer lines
    result += "Amount owed is " + totalAmount().toFixed(1) + "\n";
    result += "You earned " + totalFrequentRenterPoints() + " frequent renter points";

    return result;

    function totalAmount() {
        let totalAmount = 0;
        for (const rental of invoice.rentals) {
            totalAmount += amountFor(rental);
        }
        return totalAmount;
    }

    function totalFrequentRenterPoints() {
        let frequentRenterPoints = 0;
        for (const rental of invoice.rentals) {
            frequentRenterPoints += frequentRenterPointsFor(rental);
        }
        return frequentRenterPoints;
    }

    function frequentRenterPointsFor(rental: any) {
        let result = 1;
        // add bonus for a two day new release rental
        if (((movieFor(rental)).category === "new release") && rental.daysRented > 1)
            result++;
        return result;
    }

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