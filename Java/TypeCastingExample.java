public class TypeCastingExample {
    public static void main(String[] args) {
        double d = 45.78;
        int i = (int) d;

        System.out.println("Double Value: " + d);
        System.out.println("Converted to Int: " + i);

        int num = 25;
        double converted = (double) num;

        System.out.println("Integer Value: " + num);
        System.out.println("Converted to Double: " + converted);
    }
}