import Logo from '@/public/images/logo.svg';
import Container from './Container';
import Input from './Input';

function Header() {
    return (
        <header className=" py-[18px] border-b border-[#313442] fixed top-0 left-0 right-0 z-50 bg-main-bg">
            <Container className="flex items-center flex-col tablet:flex-row tablet:justify-between ">
                <div className="flex items-center mb-2 tablet:mb-0 tablet:mr-8 laptop:mr-0">
                    <Logo className="w-[78px] h-[30px] mr-[10px]" />
                    <p className="text-[32px]">Memes</p>
                </div>
                <Input />
            </Container>
        </header>
    );
}

export default Header;
