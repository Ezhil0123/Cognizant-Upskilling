//Transaction Handling in JDBC

import java.sql.*;

public class BankTransfer {

    public static void transfer(
            Connection con,
            int fromId,
            int toId,
            double amount) {

        try {

            con.setAutoCommit(false);

            PreparedStatement debit =
                    con.prepareStatement(
                    "UPDATE accounts " +
                    "SET balance=balance-? " +
                    "WHERE id=?");

            debit.setDouble(1, amount);
            debit.setInt(2, fromId);

            debit.executeUpdate();

            PreparedStatement credit =
                    con.prepareStatement(
                    "UPDATE accounts " +
                    "SET balance=balance+? " +
                    "WHERE id=?");

            credit.setDouble(1, amount);
            credit.setInt(2, toId);

            credit.executeUpdate();

            con.commit();

            System.out.println("Transfer Successful");

        } catch (Exception e) {

            try {
                con.rollback();
            } catch (SQLException ex) {
                ex.printStackTrace();
            }

            System.out.println("Transfer Failed");
        }
    }
}

//Accounts
CREATE TABLE accounts(
    id INT PRIMARY KEY,
    balance DOUBLE
);