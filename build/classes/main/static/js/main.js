class CategoriesModule extends Module{
    onCreate() {
        this.startLoadingCategories();
    }

    onComponentsLoading() {

    }

    onBindEvents() {
        this.container.addEventListener('click',e=>this.onSelectCategory(e.target));
    }

    onSelectCategory(){

    }

    startLoadingCategories() {
        Ajax.get("/categories",response=> {
            this.categories = JSON.parse(response);
            console.log(this.categories);
        })
    }
}



let page =new Page();
page.registerModule(new CategoriesModule(".categories"));
