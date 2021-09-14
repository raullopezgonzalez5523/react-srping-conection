package com.example.springbackendjavaraul;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
class LoadDatabase {

  private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class);

  @Bean
  CommandLineRunner initDatabase(EmployeeRepository repository) {

    return args -> {
      //log.info("Preloading " + repository.save(new Employee("", "", 0, false)));
      log.info("Preloading " + repository.save(new Employee("Raul", "Lopez", 26, true)));
      log.info("Preloading " + repository.save(new Employee("Lucero", "Vazquez", 22, true)));
      log.info("Preloading " + repository.save(new Employee("Alfonso", "Limon", 25, true)));
      log.info("Preloading " + repository.save(new Employee("Fabiola", "Lopez", 32, false)));
      log.info("Preloading " + repository.save(new Employee("Silvia", "Gonzalez", 53, false)));
      log.info("Preloading " + repository.save(new Employee("Gerardo", null, 0, false)));
    };
  }
}