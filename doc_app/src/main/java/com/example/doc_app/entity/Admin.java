package com.example.doc_app.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Table(name = "admin")
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Admin {
    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE)
    @Column(nullable = false,name = "admin_id")
    private int id;

    @Column(name="admin_name" )
    private String name;

    @Column(name ="admin_email")
    private String email;

    @Column(name="admin_mobile")
    private int mobile;

    @Column(name="admin_password")
    private String password;

    public String getName() {
        return this.name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return this.email;
    }

    public String getPassword() {
        return this.password;
    }

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name="users_userid",referencedColumnName="userid")
    private Users users;

    public int getMobile() {
        return this.mobile;
    }
    public void setMobile(int mobile){
        this.mobile=mobile;
    }
}
