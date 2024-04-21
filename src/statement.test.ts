import { describe, it } from "mocha";
import { statement} from "./statement";
import { expect } from "chai";

describe("statement", () => {
    const invoice = {
        customer: "Bob",
        rentals: [
            {
                movie: "jaws",
                daysRented: 2
            },
            {
                movie: "golden eye",
                daysRented: 3
            },
            {
                movie: "short new",
                daysRented: 1
            },
            {
                movie: "long new",
                daysRented: 2
            },
            {
                movie: "bambi",
                daysRented: 3
            },
            {
                movie: "toy story",
                daysRented: 4
            }
        ]
    };
    
    const movies = {
        "jaws": {"title": "Jaws", "category": "regular"},
        "golden eye": {"title": "Golden Eye", "category": "regular"},
        "short new": {"title": "Short New", "category": "new release"},
        "long new": {"title": "Long New", "category": "new release"},
        "bambi": {"title": "Bambi", "category": "children"},
        "toy story": {"title": "Toy Story", "category": "children"}
    }

    it("should print the invoice in plain text", () => {
        const expected = "" +
            "Rental Record for Bob\n" +
            "\tJaws\t2.0\n" +
            "\tGolden Eye\t3.5\n" +
            "\tShort New\t3.0\n" +
            "\tLong New\t6.0\n" +
            "\tBambi\t1.5\n" +
            "\tToy Story\t3.0\n" +
            "Amount owed is 19.0\n" +
            "You earned 7 frequent renter points";

        expect(statement(invoice, movies)).to.deep.equal(expected);
    });
});