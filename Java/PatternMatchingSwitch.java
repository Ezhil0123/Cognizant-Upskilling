public class PatternMatchingSwitch {

    static void checkType(Object obj) {

        switch (obj) {
            case Integer i ->
                    System.out.println("Integer value: " + i);

            case String s ->
                    System.out.println("String value: " + s);

            case Double d ->
                    System.out.println("Double value: " + d);

            case Long l ->
                    System.out.println("Long value: " + l);

            case null ->
                    System.out.println("Null value");

            default ->
                    System.out.println("Unknown Type");
        }
    }

    public static void main(String[] args) {

        checkType(100);
        checkType("Hello Java");
        checkType(45.67);
        checkType(1000L);
        checkType(null);
    }
}