package ab.loc.infostorage.services;

import ab.loc.infostorage.entities.Category;
import ab.loc.infostorage.entities.Subcategory;
import ab.loc.infostorage.repository.CategoryRepository;
import ab.loc.infostorage.repository.SubcategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    final CategoryRepository repository;
    final SubcategoryRepository subcategoryRepository;


    public List<Category> getAll(){
        return repository.findAll();
    }

    public Category add(Category category){
        category.setId(null);
        return repository.save(category);
    }

    public void deleteById(Long id){
        repository.deleteById(id);
    }

    public List<Subcategory> getSubcategoriesByCategoryId(Long id){
        return repository.getOne(id).getSubcategoryList();
    }

    @Transactional
    public void addSubcategory(Long id,Subcategory subcategory){
        subcategoryRepository.save(subcategory);
        repository.getOne(id).getSubcategoryList().add(subcategory);
    }

    public void deleteSubcategoryById(Long id) {
        subcategoryRepository.deleteById(id);
    }
}
