class CategoriesModule extends Module {

    constructor(selector, subcatModule) {
        super(selector);
        this.subcatModule = subcatModule;
    }

    onCreate() {
        this.startLoadingCategories();
    }

    onComponentsLoading() {
        this.addForm = this.get('.addform');
        this.items = this.get('.items');
    }

    onBindEvents() {
        this.addForm.querySelector('.add').addEventListener('click', e => this.addCategory());
        this.items.addEventListener('click', e => e.target.matches(".name") ? this.onSelectCategory(e.target.parentNode.dataset.id) : null);
        this.items.addEventListener('click', e => e.target.matches("button") ? this.onDeleteCategory(e.target.parentNode.dataset.id) : null);
    }

    onSelectCategory(id) {
        this.subcatModule.loadSubcategories(id);
        this.selected = id;
        this.updateView();
    }

    startLoadingCategories() {
        Ajax.get("/categories", response => {
            this.categories = JSON.parse(response);
            this.updateView();
        })
    }

    updateView() {
        this.items.innerHTML = '';
        this.categories.forEach(i => {
            if (i.id == this.selected) this.items.insertAdjacentHTML("beforeEnd", `<div class="cat item selected" data-id="${i.id}"><div class="name">${i.name}</div><button data-id="${i.id}">del</button></div>`);
            else this.items.insertAdjacentHTML("beforeEnd", `<div class="cat item" data-id="${i.id}"><div class="name">${i.name}</div><button data-id="${i.id}">del</button></div>`);
        })
    }

    addCategory() {
        Ajax.post("/categories", {name: this.addForm.querySelector("input").value}, resp => {
            this.startLoadingCategories();
        });
        this.addForm.querySelector("input").value = "";
    }

    onDeleteCategory(id) {
        Ajax.delete("/categories/" + id, {}, resp => {
            this.startLoadingCategories();
            this.subcatModule.onDeleteBaseCategory(id);
        })
    }
}


class ModuleSubcategory extends Module {
    onCreate() {

    }

    onComponentsLoading() {
        this.addForm = this.get('.addform');
        this.items = this.get('.items');
    }

    onBindEvents() {
        this.addForm.querySelector('.add').addEventListener('click', e => this.addSubategory());
        this.items.addEventListener('click', e => e.target.matches(".name")
            ? this.onSelectSubcategory(e.target.parentNode.dataset.id)
            : null
        );
        this.items.addEventListener('click', e => e.target.matches("button")
            ? this.onDeleteSubategory(e.target.parentNode.dataset.id)
            : null
        );
    }

    onSelectSubcategory(id) {
        alert("SELECT " + id)
    }

    loadSubcategories(id) {
        this.categoryId = id;
        Ajax.get("/categories/" + id, response => {
            this.subcategories = JSON.parse(response);
            this.updateView();
            this.show();
        })
    }

    updateView() {
        this.items.innerHTML = '';
        this.subcategories.forEach(i => {
            this.items.insertAdjacentHTML("beforeEnd", `<div class="cat item" data-id="${i.id}"><div class="name">${i.name}</div><button data-id="${i.id}">del</button></div>`);
        })
    }

    addSubategory() {
        Ajax.post("/categories/" + this.categoryId, {name: this.addForm.querySelector("input").value}, resp => {
            this.loadSubcategories(this.categoryId);
        });
        this.addForm.querySelector("input").value = "";
    }

    onDeleteSubategory(id) {
        Ajax.delete("/categories/sub/" + id, {}, resp => {
            this.loadSubcategories(this.categoryId);
        })
    }

    onDeleteBaseCategory(id) {
        if (id == this.categoryId) {
            this.hide();
            this.categoryId = null;
        }
    }

    show() {
        this.container.style.display = "block";
    }

    hide() {
        this.container.style.display = "none";
    }
}


let subcategoryModule = new ModuleSubcategory(".subcategories");
let categoryModule = new CategoriesModule(".categories", subcategoryModule);

let page = new Page();
page.registerModule(subcategoryModule);
page.registerModule(categoryModule);
page.start();
