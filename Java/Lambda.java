import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class Lambda {
    public static void main(String[] args) {

        List<String> names = Arrays.asList(
                "Ravi",
                "Kumar",
                "Anand",
                "Bala"
        );

        Collections.sort(names,
                (a, b) -> a.compareTo(b));

        System.out.println("Sorted List:");
        names.forEach(System.out::println);
    }
}