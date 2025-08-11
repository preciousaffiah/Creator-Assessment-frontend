import { motion, AnimatePresence } from "framer-motion";

interface PropTypes {
    children: JSX.Element | React.ReactNode;
}

const PageAnimation = (props: PropTypes) => {

    const spring = {
        type: "spring",
        damping: 20,
        stiffness: 100,
        when: "afterChildren",
    };

    return (
        <AnimatePresence>
            <div>
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ delay: 0.1 }}

                >
                    {props.children}
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

export default PageAnimation;