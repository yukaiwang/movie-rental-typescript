import { createStatementData } from "./createStatementData";

export function statement(invoice: any, movies: any): string {
    return renderPlainText(createStatementData(invoice, movies));
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