import { FunctionComponent, useState } from 'react';
import { Ingredient } from '../../Api/Beer';
import "./BeerItem.sass";
import { IngredientsToolTip } from './Ingredients';

interface BeerItemProps {
    name: string;
    image_url: string;
    description: string;
    ingredients: Ingredient;
}

export const BeerItem: FunctionComponent<BeerItemProps> = (props) => {
    const [showDescription, setshowDescription] = useState(false);
    const [showIngredients, setShowIngredients] = useState(false);

    const [imgUrl] = useState(props.image_url || "https://img.icons8.com/fluency/48/000000/image.png");
    return (<div className='BeerItem'>
        <div className='content'>
            <span className='favorite'>{props.children}</span>
            <span className='title'>{props.name}</span>
            <span className={showDescription ? 'description active' : 'description'} onMouseEnter={() => setshowDescription(true)} onMouseLeave={() => setshowDescription(false)}>{props.description}</span>
            <span onMouseEnter={() => setShowIngredients(true)} onMouseLeave={() => setShowIngredients(false)}>
                Inrgedients
                <IngredientsToolTip show={showIngredients}>
                    <ul>
                        <li>Hops</li>
                        <li><ul className='hops'>
                            {props.ingredients.hops.map((hop, key) => {
                                return <li key={key}>
                                    <span>{hop.name}</span>
                                    <span>{hop.add}</span>
                                    <span>{hop.attribute}</span>
                                </li>
                            })}
                        </ul></li>

                        <li>Malt</li>

                        <li><ul className='malt'>
                        {props.ingredients.malt.map((malt, key) => {
                            return <li key={key}>
                                <span>{malt.name} ({malt.amount.value} {malt.amount.unit})</span>
                            </li>
                        })}
                        </ul></li>

                        <li><span>Yeast: {props.ingredients.yeast}</span></li>
                    </ul>
                </IngredientsToolTip>
            </span>

            {!showIngredients ? <div className='image'>
                <img alt={props.name} src={imgUrl}/> 
            </div> : null}
        </div>
    </div>)
}