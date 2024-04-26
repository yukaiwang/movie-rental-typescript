import { rentalCalculators } from "./rentalCalculators";

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
        return (getRentalCalculator(rental)).amountFor(rental.daysRented);
    }

    function frequentRenterPointsFor(rental: { movie: { category: string }, daysRented: number }) {
        return (getRentalCalculator(rental)).frequentRenterPointsFor(rental.daysRented);
    }

    function getRentalCalculator(rental: { movie: { category: string; }; daysRented: number; }) {
        const rentalCalculator = rentalCalculators.find(calculator => calculator.category === rental.movie.category);
        if (!rentalCalculator) {
            throw new Error(`Unknown category: ${rental.movie.category}`);
        }
        return rentalCalculator;
    }

    function totalAmount(data: any) {
        return data.rentals.reduce((total: number, rental: any) => total + rental.amount, 0);
    }

    function totalFrequentRenterPoints(data: any) {
        return data.rentals.reduce((total: number, rental: any) => total + rental.frequentRenterPoints, 0);
    }
}
