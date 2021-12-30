import { FunctionComponent, useState, useEffect } from 'react';
import { FavoriteToggle } from '../../Api/Api';
import { LoadBeerByPage, Beer } from '../../Api/Beer';
import { BeerItem } from './BeerItem';
import "./BeerList.sass";

export const BeerList: FunctionComponent = () => {
    const loadPage: string = localStorage.getItem('latest_page') || "1";

    const [beerTitle, setBeerTitle] = useState<string>("Beer List");

    const [BeerItems, setBeerItems] = useState<Beer[]>([]);
    const [pages, setPages] = useState<number[]>([1, 2, 3]);
    const [page, setPage] = useState<number>(parseInt(loadPage));
    const [last, setLast] = useState<number>(0);
    const lastPage: number = 65;

    useEffect(() => {
        const fetchBeers = async (page: number) => {
            setBeerItems(await LoadBeerByPage(page));
        }

        if(page < 1 || page > lastPage)
            setPage(1);

        if (page !== last) {
            fetchBeers(page);
            setLast(page);

            localStorage.setItem('latest_page', page.toString());

            if(page <= 2) setPages([2, 3]);
            else if(page >= lastPage - 1) setPages([63, 64]);
            else setPages([page - 1, page, page + 1]);
        }
    }, [page, last]);

    return (<section className='BeerList'>
        <header className='title'>{beerTitle}</header>
        <ul>
            {BeerItems.map(beer => {
                return <li key={beer.id} onMouseEnter={() => setBeerTitle(beer.name)}><BeerItem
                    name={beer.name}
                    image_url={beer.image_url}
                    description={beer.description}
                    ingredients={beer.ingredients}>
                        <div className='star'>
                            <img onClick={() => FavoriteToggle(beer.id)} alt="[star]" src="https://img.icons8.com/ultraviolet/40/000000/filled-star--v1.png"/>
                        </div>
                </BeerItem></li>
            })}
        </ul>

        <ul className='pageList' onMouseEnter={() => setBeerTitle("Beer List")}>
            {page > 1 ? <li onClick={() => setPage(page - 1)}>{"<"}</li> : null}
            <li onClick={() => setPage(1)} className={page === 1 ? "active" : ""}>{page >= 4 ? "..." : 1}</li>
            {pages.map((p, key) => {
                return <li key={key} className={page === p ? "active" : ""} onClick={() => setPage(p)}>{p}</li>
            })}
            <li onClick={() => setPage(lastPage)} className={page === lastPage ? "active" : ""}>{page <= lastPage - 3 ? "..." : lastPage}</li>
            {page < lastPage ? <li onClick={() => setPage(page + 1)}>{">"}</li> : null}
        </ul>

    </section>);
};