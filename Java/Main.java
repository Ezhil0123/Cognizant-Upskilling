//Create and Use JDBC

//com.utils/module-info.java
module com.utils {
    exports com.utils;
}

//Utility Class
package com.utils;

public class MessageUtil {

    public static String getMessage() {
        return "Hello from Utility Module";
    }
}

//com.greetings/module-info.java
module com.greetings {
    requires com.utils;
}


//Main Class
package com.greetings;

import com.utils.MessageUtil;

public class Main {

    public static void main(String[] args) {
        System.out.println(
                MessageUtil.getMessage());
    }
}

//Compile
javac -d mods/com.utils src/com.utils/module-info.java src/com.utils/com/utils/*.java

javac --module-path mods -d mods/com.greetings src/com.greetings/module-info.java src/com.greetings/com/greetings/*.java

java --module-path mods -m com.greetings/com.greetings.Main