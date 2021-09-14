package com.example.springbackendjavaraul;
import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
class Employee {

  private @Id @GeneratedValue Long id;
  private String firstname;
  private String lastname;
  private Integer age;
  private Boolean status;

  Employee() {}

  Employee(String firstname, String lastname, Integer age, Boolean status) {

    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
    this.status = status;
  }

  public Long getId() {return this.id;}
  public String getfirstName() {return this.firstname;}
  public String getlastName() {return this.lastname;}
  public Integer getAge() {return this.age;}
  public Boolean getStatus() {return this.status;}

  public void setId(Long id) {this.id = id;}
  public void setfirstName(String firstname) {this.firstname = firstname;}
  public void setlastName(String lastname) {this.lastname = lastname;}
  public void setAge(Integer age) {this.age = age;}
  public void setStatus(Boolean status) {this.status = status;}

  @Override
  public boolean equals(Object o) {

    if (this == o)
      return true;
    if (!(o instanceof Employee))
      return false;
    Employee employee = (Employee) o;
    return Objects.equals(this.id, employee.id) 
        && Objects.equals(this.firstname, employee.firstname)
        && Objects.equals(this.lastname, employee.lastname)
        && Objects.equals(this.age, employee.age)
        && Objects.equals(this.status, employee.status);
  }

  @Override
  public int hashCode() {
    return Objects.hash(this.id, this.firstname, this.lastname, this.age, this.status);
  }

  @Override
  public String toString() {
    return 
          "{" + 
          "id:" + this.id +
          ", firstName:'" + this.firstname +
          ", lastName:'" + this.lastname +
          ", age:'" + this.age +
          ", status:'" + this.status + 
          '}';
  }
}