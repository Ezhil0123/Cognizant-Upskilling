import java.lang.reflect.*;

public class Reflections {

    public static void main(String[] args)
            throws Exception {

        Class<?> cls =
                Class.forName("Calculator");

        Object obj =
                cls.getDeclaredConstructor()
                        .newInstance();

        Method[] methods =
                cls.getDeclaredMethods();

        for(Method m : methods) {
            System.out.println(
                    "Method: "
                    + m.getName());
        }

        Method greet =
                cls.getDeclaredMethod(
                        "greet");

        greet.invoke(obj);
    }
}