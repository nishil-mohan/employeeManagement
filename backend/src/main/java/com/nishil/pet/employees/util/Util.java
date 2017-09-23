package com.nishil.pet.employees.util;

import java.util.Random;

public class Util {
public static String getEmployeeId() {
	Random rnd = new Random();
	int n = 10000 + rnd.nextInt(9000);
	return "A-"+n;
}
}
