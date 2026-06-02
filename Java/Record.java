import java.util.List;

record Person(String name, int age) {}

public class Record {
    public static void main(String[] args) {

        Person p1 = new Person("Ezhil", 20);
        Person p2 = new Person("Rahul", 17);
        Person p3 = new Person("Priya", 22);

        System.out.println(p1);
        System.out.println(p2);
        System.out.println(p3);

        List<Person> people = List.of(p1, p2, p3);

        System.out.println("\nPeople age >= 18:");

        people.stream()
                .filter(person -> person.age() >= 18)
                .forEach(System.out::println);
    }
}