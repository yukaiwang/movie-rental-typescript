type RentalCalculator = {
    category: string;
    amountFor: (daysRented: number) => number;
    frequentRenterPointsFor: (daysRented: number) => number;
};

const regularRentalCalculator: RentalCalculator = {
    category: "regular",
    amountFor: (daysRented: number) => {
        let result = 2;
        if (daysRented > 2) {
            result += (daysRented - 2) * 1.5;
        }
        return result;
    },
    frequentRenterPointsFor: () => 1
};

const newReleaseRentalCalculator: RentalCalculator = {
    category: "new release",
    amountFor: (daysRented: number) => daysRented * 3,
    frequentRenterPointsFor: (daysRented: number) => daysRented > 1 ? 2 : 1
};

const childrenRentalCalculator: RentalCalculator = {
    category: "children",
    amountFor: (daysRented: number) => {
        let result = 1.5;
        if (daysRented > 3) {
            result += (daysRented - 3) * 1.5;
        }
        return result;
    },
    frequentRenterPointsFor: () => 1
};

export const rentalCalculators = [regularRentalCalculator, newReleaseRentalCalculator, childrenRentalCalculator];