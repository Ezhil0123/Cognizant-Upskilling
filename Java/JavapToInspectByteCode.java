// Program
// public class JavapToInspectByteCode {

//     public void display() {
//         System.out.println("Hello");
//     }
// }
// Compile
// javac Sample.java
// Inspect Bytecode
// javap -c Sample
// Output
// public void display();
// Code:
// 0: getstatic #2
// 3: ldc #3
// 5: invokevirtual #4
// 8: return
// Meaning
// Instruction	Meaning
// getstatic	Load System.out
// ldc	Load constant "Hello"
// invokevirtual	Call println()
// return	Exit method