import react, { FunctionComponent } from 'react';

interface IngredientsToolTipProps {
    show: any;
    children: any;
}

export const IngredientsToolTip: FunctionComponent<IngredientsToolTipProps> = (props) => {
    return (<div className={props.show ? 'Ingredients active' : 'Ingredients'}>
        {props.children}
    </div>);
}