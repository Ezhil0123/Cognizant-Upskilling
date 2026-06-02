import java.sql.*;

public class StudentDAO {

    private Connection con;

    public StudentDAO(Connection con) {
        this.con = con;
    }

    public void insertStudent(int id,
                              String name,
                              int age) throws SQLException {

        String sql =
                "INSERT INTO students VALUES(?,?,?)";

        PreparedStatement ps =
                con.prepareStatement(sql);

        ps.setInt(1, id);
        ps.setString(2, name);
        ps.setInt(3, age);

        ps.executeUpdate();

        System.out.println("Student Inserted");
    }

    public void updateStudent(int id,
                              String newName)
            throws SQLException {

        String sql =
                "UPDATE students SET name=? WHERE id=?";

        PreparedStatement ps =
                con.prepareStatement(sql);

        ps.setString(1, newName);
        ps.setInt(2, id);

        ps.executeUpdate();

        System.out.println("Student Updated");
    }
}

//Main Class
Connection con =
DriverManager.getConnection(url,user,password);

StudentDAO dao = new StudentDAO(con);

dao.insertStudent(3,"Priya",22);

dao.updateStudent(3,"Ananya");