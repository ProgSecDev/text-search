import { useState, useMemo, useCallback } from 'react';
import './TextSearch.css';


const PARAGRAPHS = [
    {
        id: 1,
        title: "Understanding the difference between grid template and grid-auto",
        date: "Oct 09, 2018",
        body: "With all the new properties related to CSS Grid Layout, one of the disctinctions that always confused me was the difference between the grid-template-* and grid-auto-* properties. Specifically the difference between grid-template-rows/columns and grid-auto-rows/columns.",
    },
    {
        id: 2,
        title: "The difference between react js and react native",
        body: "Both react js and react native belong to react environment but the difference is that react js is a frontend web language and it's used to create web interfaces, while react native is used in mobile development and for both Android and IOS.",
    }
];

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

function HighlightedText({ text, request }) {
    if (!request.trim()) return<>{text}</>;

        const regex = new RegExp(`(${escapeRegex(request)})`, "gi");
        const parts = text.split(regex);

        return (
            <>
                {parts.map((part, i) =>
                    regex.test(part) ? (
                        <mark key={i} className='highlight'>
                            {part}
                        </mark>
                    ) : (
                        <span key={i}>{part}</span>
                    )
                )}
            </>
        );
}


function Paragraphs({ paragraph, request }) {
        return (
            <article className='parag'>
                <h2 className='parag-title'>
                    <HighlightedText text={paragraph.title} request={request} />
                </h2>
                <time className='parag-date'>{paragraph.date}</time>
                <p className='parag-body'>
                    <HighlightedText text={paragraph.body} request={request} />
                </p>
            </article>
        );
    }


export default function Search() {
        const [request, setRequest] = useState("");


        const results = useMemo(() => {
            const r = request.trim().toLowerCase();
            if (!r)
                return PARAGRAPHS;
            return PARAGRAPHS.filter(
                (p) => p.title.toLowerCase().includes(r) || p.body.toLowerCase().includes(r)
            );
        }, [request]);


        const handleClear = useCallback(() => setRequest(""), []);
        
        return (
                <div className='app'>
                    <header className='header'>
                        <h1>Search Paragraphs</h1>
                        <p>Find posts by keywords - matches are highlighted instantly.</p>
                    </header>

                    <div className='search-wrap'>
                        <span className='search-icon'>O</span>
                        <input
                            className='search-input'
                            type='text'
                            placeholder='Type a keyword or phrase...'
                            value={request}
                            onChange={(e) => setRequest(e.target.value)}
                            autoFocus
                        />
                        {request && (
                            <button className='clear-btn' onClick={handleClear} aria-label='Clear Search'>
                                X
                            </button>
                        )}
                    </div>
                    <p className='result-count'>
                        {request ? (
                            <>
                                <strong>{results.length}</strong>{" "}
                                {results.length === 1 ? "post" : "posts"} found for (" ")
                                <strong>"{request}"</strong>
                            </>
                        ) : (
                            <>Showing all <strong>{PARAGRAPHS.length}</strong> posts</>
                        )}
                    </p>


                    {results.length === 0 ? (
                        <div className='empty'>
                            <div className='empty-icon'>OO</div>
                            <p>No paragraphs match your search. Try a different keyword</p>
                        </div>
                    ) : (
                        results.map((paragraph) => (
                            <Paragraphs key={paragraph.id} paragraph={paragraph} request={request.trim()} />
                        ))
                    )}
                </div>
        );
    }