import React from 'react'
import Head from 'next/head'

export default function BaseLayout({ title, children }) {
    return (
        <div className='root'>
            <Head>
                <title>{title}</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='App'>
                {children}
            </div>
        </div>
    )
}
