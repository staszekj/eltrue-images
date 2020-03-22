/* eslint-disable react/no-danger */
import React, {FunctionComponent} from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import MuiLink from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
    root: {
        top: 70,
        // Fix IE 11 position sticky issue.
        marginTop: 70,
        width: 175,
        flexShrink: 0,
        position: 'sticky',
        height: 'calc(100vh - 70px)',
        overflowY: 'auto',
        padding: theme.spacing(2, 2, 2, 0),
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    contents: {
        marginTop: theme.spacing(2),
        paddingLeft: theme.spacing(1.5),
    },
    ul: {
        padding: 0,
        margin: 0,
        listStyle: 'none',
    },
    item: {
        fontSize: 13,
        padding: theme.spacing(0.5, 0, 0.5, 1),
        borderLeft: '4px solid transparent',
        boxSizing: 'content-box',
        '&:hover': {
            borderLeft: `4px solid ${
                theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
            }`,
        },
        '&$active,&:active': {
            borderLeft: `4px solid ${
                theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[800]
            }`,
        },
    },
    secondaryItem: {
        paddingLeft: theme.spacing(2.5),
    },
    active: {},
}));

type TImageResolutionsData = {
    text: string,
    hash: string
    active: boolean,
    children: TImageResolutionsData[]
}

export const ImageResolutions: FunctionComponent = () => {
    const classes = useStyles();
    const tocItems: TImageResolutionsData[] = [
        {
            text: '1920 x 1280',
            hash: "test1",
            active: false,
            children: [
                {
                    text: 'Stan Jagiella',
                    hash: "test11",
                    active: false,
                    children: []
                },
                {
                    text: 'Mike Jagiella',
                    hash: "test12",
                    active: true,
                    children: []
                }
            ]
        },
        {
            text: '5000 x 1100',
            hash: "test2",
            active: false,
            children: []
        },
        {
            text: '6000 x 1100',
            hash: "test3",
            active: false,
            children: []
        }
    ];

    const ItemLink = (item: TImageResolutionsData, secondary: boolean = false) => (
        <MuiLink
            display="block"
            color={item.active ? 'textPrimary' : 'textSecondary'}
            underline="none"
            className={clsx(
                classes.item,
                {
                    [classes.secondaryItem]: secondary,
                    [classes.active]: item.active
                },
            )}
        >
            <span dangerouslySetInnerHTML={{__html: item.text}}/>
        </MuiLink>
    );

    return (
        <nav className={classes.root} aria-label={'pageTOC'}>
            {tocItems.length > 0 ? (
                <React.Fragment>
                    <Typography gutterBottom className={classes.contents}>
                        {'Table Of Contents'}
                    </Typography>
                    <Typography component="ul" className={classes.ul}>
                        {tocItems.map(item => (
                            <li key={item.text}>
                                {ItemLink(item)}
                                {item.children.length > 0 ? (
                                    <ul className={classes.ul}>
                                        {item.children.map(subItem => (
                                            <li key={subItem.text}>{ItemLink(subItem, true)}</li>
                                        ))}
                                    </ul>
                                ) : null}
                            </li>
                        ))}
                    </Typography>
                </React.Fragment>
            ) : null}
        </nav>
    );
}
