import React from "react";
import 'styles/componentFooter.css'
import Link from "@material-ui/core/Link";

function Footer()  {
    return (
        <div className="footer">
            <div className={'center-div'}>
                <Link href={"https://github.com/burwinliu/FamilyTree"} rel={"noopener"}>Source Code</Link>
            </div>
        </div>
    );
}

export default Footer;