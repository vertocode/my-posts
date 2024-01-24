import './BaseCard.scss'
import { ReactElement } from 'react'

const BaseCard = ({ children, className }): ReactElement => {
	return (
		<div className={ `BaseCard ${className}` }>
			{children}
		</div>
	)
}

export default BaseCard