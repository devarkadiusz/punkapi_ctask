import React, { FunctionComponent, ReactChild } from 'react';

interface IngredientsToolTipProps {
    show: boolean;
    children: ReactChild;
}

export const IngredientsToolTip: FunctionComponent<IngredientsToolTipProps> = (props) => {
    return (<div className={props.show ? 'Ingredients active' : 'Ingredients'}>
        {props.children}
    </div>);
}