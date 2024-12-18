export function validate(...params: string[]) {
    const [category, name, url] = params;

    const validations = {
        'category': { header: "Categoria", message: "Selecione uma categoria" },
        'name': { header: "Nome", message: "Informe o nome" },
        'url': { header: "URL", message: "Informe a URL do link" },
    }

    if (!category.trim()) {
        const { header, message } = validations["category"];
        return [header, message];
    }

    if (!name.trim()) {
        const { header, message } = validations["name"];
        return [header, message];
    }

    if (!url.trim()) {
        const { header, message } = validations["url"];
        return [header, message];
    }

    return [];
}