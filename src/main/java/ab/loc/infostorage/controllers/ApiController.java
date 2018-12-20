package ab.loc.infostorage.controllers;

import ab.loc.infostorage.dto.CategoryDto;
import ab.loc.infostorage.entities.Category;
import ab.loc.infostorage.entities.Subcategory;
import ab.loc.infostorage.services.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class ApiController {

    final CategoryService categoryService;

    @GetMapping("categories")
    public List<CategoryDto> actionGetCategories() {
        return categoryService.getAll()
                .stream()
                .map(c -> CategoryDto.builder().id(c.getId()).name(c.getName()).build())
                .collect(Collectors.toList());
    }

    @PostMapping("categories")
    public void actionAddCategory(String name) {
        Category category = new Category();
        category.setName(name);
        categoryService.add(category);
    }
    @DeleteMapping("categories/{id}")
    public void actionDeleteCategory(@PathVariable("id") Long id) {
        categoryService.deleteById(id);
    }

    @GetMapping("categories/{id}")
    public List<CategoryDto> actionGetSubcategory(@PathVariable("id") Long id) {
        return categoryService.getSubcategoriesByCategoryId(id)
                .stream().map(c->CategoryDto.builder().id(c.getId()).name(c.getName()).build()).collect(Collectors.toList());
    }

    @PostMapping("categories/{id}")
    public void actionAddSubcategory(@PathVariable("id") Long id, String name) {
        Subcategory subcategory = new Subcategory();
        subcategory.setName(name);
        this.categoryService.addSubcategory(id,subcategory);
    }
    @DeleteMapping("categories/sub/{id}")
    public void actionDeleteSubategory(@PathVariable("id") Long id) {
        categoryService.deleteSubcategoryById(id);
    }


}
