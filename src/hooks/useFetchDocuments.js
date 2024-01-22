import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, query, orderBy, onSnapshot, where } from 'firebase/firestore';
import { useLocation } from "react-router-dom";
export const useFetchDocuments = (docCollection, uid = null) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const location = useLocation();
    console.log(location, 'location');
    const currentSearch = location.search;
    const [search, setSearch] = useState(null);
    // deal with memory leaks
    const [cancelled, setCancelled] = useState(false);
    useEffect(() => {
        async function loadData() {
            if (cancelled)
                return;
            setLoading(true);
            setSearch(currentSearch);
            const collectionRef = await collection(db, docCollection);
            try {
                let q;
                if (search) {
                    q = await query(collectionRef, where('tags', 'array-contains', search), orderBy('createdAt', 'desc'));
                }
                else {
                    q = await query(collectionRef, orderBy('createdAt', 'desc'));
                }
                await onSnapshot(q, (querySnapshot) => {
                    setDocuments(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
                });
            }
            catch (error) {
                console.log(error.message);
                setError(error.message);
            }
            setLoading(false);
        }
        loadData();
        console.log();
    }, [docCollection, search, uid, cancelled, currentSearch]);
    useEffect(() => setCancelled(true), []);
    return { documents, error, loading, search };
};
