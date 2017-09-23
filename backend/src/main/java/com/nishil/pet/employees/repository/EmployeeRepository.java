package com.nishil.pet.employees.repository;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.nishil.pet.employees.entity.Employee;

public interface EmployeeRepository extends CrudRepository<Employee, String>   {
    @Override
    Employee findOne(String id);
    
    List<Employee> findByNameLike(String id);

    @Override
    void delete(Employee deleted);
}