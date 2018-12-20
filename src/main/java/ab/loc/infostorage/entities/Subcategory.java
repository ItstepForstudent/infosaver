package ab.loc.infostorage.entities;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
public class Subcategory {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Basic
    @Getter @Setter
    Long id;

    @Getter @Setter
    String name;

    @ManyToOne(targetEntity = Category.class,fetch = FetchType.EAGER)
    @Getter @Setter
    @JoinColumn(name = "category_id")
    Category category;

}
