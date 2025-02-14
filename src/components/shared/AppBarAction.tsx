import { useMenuContext } from 'context/MenuContext'
import React from 'react'
import { Appbar } from 'react-native-paper'

interface Props {
    touchable: React.MutableRefObject<null>,
}

export const AppBarAction = ({ touchable }: Props) => {
    const { toogleMenu } = useMenuContext()

    return (
        <Appbar.Action
            icon="chevron-down"
            onPressIn={() => toogleMenu()}
            ref={touchable}
        />
    )
}
