package com.ted.DeepInThought;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DeepInThoughtApplication {
	static {
		System.setProperty("java.awt.headless", "false");
	}
	public static void main(String[] args) {
		SpringApplication.run(DeepInThoughtApplication.class, args);
	}

}
ls
