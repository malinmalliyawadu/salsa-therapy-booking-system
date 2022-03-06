import { useRouter } from 'next/dist/client/router'

interface HeaderNavLinkProps {
    href: string
}

export const HeaderNavLink: React.FC<HeaderNavLinkProps> = ({
    children,
    href,
}) => {
    const router = useRouter()
    const isSelected = router.pathname === href

    return (
        <a
            href={href}
            className={`${
                isSelected
                    ? 'border-b-4 text-purple-500 border-purple-500'
                    : 'hover:text-purple-500'
            } pb-1`}
        >
            {children}
        </a>
    )
}
