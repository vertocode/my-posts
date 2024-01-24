import './Footer.scss'
import { ReactElement } from 'react'

const Footer = (): ReactElement => {
	return (
		<div className="Footer">
			<h3>Express Yourself!</h3>
			<p>MyPosts - Your space to share thoughts, ideas, and stories with friends.</p>
			<p>
                Crafted with ❤️ by{' '}
				<a href="https://vertocode.com" target="_blank">
                    vertocode
				</a>
			</p>
		</div>
	)
}

export default Footer
