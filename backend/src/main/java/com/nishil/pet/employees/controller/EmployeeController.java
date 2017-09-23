package com.nishil.pet.employees.controller;

import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.nishil.pet.employees.entity.Employee;
import com.nishil.pet.employees.repository.EmployeeRepository;
import com.nishil.pet.employees.util.Util;


/**
 * 
 * @author nishil85
 * REST layer for Employee CRUD operations.
 * As this is a small module, seperation of concern is not taken account.
 * Idle to have a service layer injected and remove repository dependency on REST layer
 * 
 * TODO - Exception Management
 */
@RestController
@RequestMapping("/employee")
public class EmployeeController {



	@Autowired
	EmployeeRepository employeeRepository;

	/**
	 * Retrieve All Employees List
	 * TODO - Add pagination support
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/list", method= RequestMethod.GET)
	public Iterable<Employee> list(Model model){
		Iterable<Employee> productList = employeeRepository.findAll();
		return productList;
	}

	/**
	 * Retrieve Employee by Name
	 * TODO - Option to search with additional attributes
	 * @param name
	 * @param model
	 * @return
	 */
	@RequestMapping(value = "/show/{name}", method= RequestMethod.GET)
	public ResponseEntity<List<Employee>> showEmployee(@PathVariable String name, Model model){
		List<Employee> employees = employeeRepository.findByNameLike(name);
		if(employees==null) {
			return new ResponseEntity<List<Employee>>(employees, HttpStatus.BAD_REQUEST);
		}
		return new ResponseEntity<List<Employee>>(employees, HttpStatus.OK);
	}

	/**
	 * Save Employee
	 * 
	 * @param employee
	 * @return
	 */
	@RequestMapping(value = "/add", method = RequestMethod.POST)
	public ResponseEntity saveEmployee(@RequestBody Employee employee){
		employee.setId(Util.getEmployeeId());
		Employee emp=employeeRepository.save(employee);
		if(emp!=null) {
			return new ResponseEntity(emp, HttpStatus.OK);
		}else {
			return new ResponseEntity("Save Failed", HttpStatus.EXPECTATION_FAILED);
		}
	}

	/**
	 * Saves Multiple Employee Details at once
	 * @param employees
	 * @return
	 */
	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	@Transactional
	public ResponseEntity<String> saveEmployees(@RequestBody List<Employee> employees){

		if(employees!=null) {
			for(Employee employee:employees) {
				employee.setId(Util.getEmployeeId());
				Employee emp = employeeRepository.save(employee);
				if(emp==null) { //If any is not saved
					return new ResponseEntity<String>("Save Failed", HttpStatus.EXPECTATION_FAILED);
				}
			}
		}
		return new ResponseEntity<String>("Successfully saved", HttpStatus.OK);

	}

	/**
	 * Update Employee Details
	 * @param id
	 * @param employee
	 * @return
	 */
	@RequestMapping(value = "/update/{id}", method = RequestMethod.POST)
	public ResponseEntity<Employee> updateEmployee(@PathVariable String id, @RequestBody Employee employee){
		Employee storedEmployee = employeeRepository.findOne(id);
		BeanUtils.copyProperties(employee, storedEmployee, "id");
		Employee emp=employeeRepository.save(storedEmployee);
		return new ResponseEntity<Employee>(emp, HttpStatus.OK);
	}


	/**
	 * Delete Employee Details
	 * @param id
	 * @return
	 */
	@RequestMapping(value="/delete/{id}", method = RequestMethod.POST)
	public ResponseEntity<Employee> delete(@PathVariable String id){
		employeeRepository.delete(id);
		Employee deletedEmp=new Employee();
		deletedEmp.setId(id);
		return new ResponseEntity<Employee>(deletedEmp, HttpStatus.OK);

	}
}
