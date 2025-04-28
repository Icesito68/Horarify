import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <AppLogoIcon className="fill-current text-white dark:text-black" />
            </div>
            
            <select
                className="ml-1 flex-1 rounded-md border border-border bg-background px-2 py-1 text-sm font-medium text-foreground shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            >
                <option value="playa">Suma Playa</option>
                <option value="sur" selected>Suma Norte</option>
                <option value="norte">Suma Sur</option>
            </select>



            {/* <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">Horarify</span>
            </div> */}
        </>
    );
}
