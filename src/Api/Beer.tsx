const API_URL="https://api.punkapi.com/v2/beers"

export interface Amount {
    value: number;
    unit: string;
}

export interface Malt {
    name: string;
    add: string;
    amount: Amount;
    attribute: string;
}

export interface Hops {
    name: string;
    add: string;
    amount: Amount;
    attribute: string;
}

export interface Ingredient {
    malt: Malt[];
    hops: Hops[];
    yeast: string;
}

export interface Beer {
    id: number;
    name: string;
    image_url: string;
    description: string;
    ingredients: Ingredient;
}

export const LoadBeerByPage = async (page: number) => {
    const name = `page_${page}`.toString();
    let beerPage = localStorage.getItem(name);
    let data;

    if(beerPage)
    {
        data = JSON.parse(beerPage);
    }
    else
    {
        data = await GetBeerByPage(page);
        localStorage.setItem(name, JSON.stringify(data));
    }

    for (let index = 1; index < 4; index++) {
        const page_next = page + index;
        const name_next = `page_${page_next}`.toString();
        let beerPage_next = localStorage.getItem(name_next);

        if(!beerPage_next && page_next <= 65)
        {
            const data_next = await GetBeerByPage(page_next);
            localStorage.setItem(name_next, JSON.stringify(data_next));
        }
    }
    
    return data;
}

export const LoadBeerByIds = async (ids: number[]) => {
    const per = 5;
    let data: any;
    ids.map(async (id: number) => {
        localStorage.setItem(`favorite_${id}`, JSON.stringify(await GetBeerById(id)));
    })
}

export const GetBeerByPage = async (page: number) => {
    const per = 5;
    let data;
    await fetch(API_URL + `?per_page=${per}&page=${page}`).then(async response => {
        data = await response.json();
    })
    return data;
}

export const GetBeerById = async (id: number) => {
    let data;
    await fetch(API_URL + '/' + id).then(async response => {
        data = await response.json();
    })
    return data;
}