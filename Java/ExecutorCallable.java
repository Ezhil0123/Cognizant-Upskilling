import java.util.concurrent.*;

public class ExecutorCallable {

    public static void main(String[] args)
            throws Exception {

        ExecutorService executor =
                Executors.newFixedThreadPool(3);

        Callable<Integer> task1 =
                () -> 10 + 20;

        Callable<Integer> task2 =
                () -> 30 + 40;

        Callable<Integer> task3 =
                () -> 50 + 60;

        Future<Integer> f1 =
                executor.submit(task1);

        Future<Integer> f2 =
                executor.submit(task2);

        Future<Integer> f3 =
                executor.submit(task3);

        System.out.println(
                "Result 1 = "
                + f1.get());

        System.out.println(
                "Result 2 = "
                + f2.get());

        System.out.println(
                "Result 3 = "
                + f3.get());

        executor.shutdown();
    }
}