package ab.loc.infostorage.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.List;

@Entity
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Basic
    @Getter @Setter
    Long id;
    @Getter @Setter
    String name;

    @Getter @Setter
    @OneToMany(targetEntity = Subcategory.class,fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name = "category_id")
    List<Subcategory> subcategoryList;
}
