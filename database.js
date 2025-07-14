// Database API functions for Mastitislabor App

const API_BASE = '/api';

// Helper function for API calls
async function apiCall(endpoint, method = 'GET', data = null) {
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        }
    };
    
    if (data) {
        options.body = JSON.stringify(data);
    }
    
    try {
        const response = await fetch(API_BASE + endpoint, options);
        const result = await response.json();
        
        if (!response.ok) {
            throw new Error(result.message || 'API call failed');
        }
        
        return result;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Owner API functions
async function getOwners() {
    return await apiCall('/owners');
}

async function createOwner(ownerData) {
    return await apiCall('/owners', 'POST', ownerData);
}

// Animal API functions
async function getAnimals() {
    return await apiCall('/animals');
}

async function createAnimal(animalData) {
    return await apiCall('/animals', 'POST', animalData);
}

// Sample API functions
async function getSamples() {
    return await apiCall('/samples');
}

async function createSample(sampleData) {
    return await apiCall('/samples', 'POST', sampleData);
}

// Microbiology API functions
async function getMicrobiologyResults() {
    return await apiCall('/microbiology');
}

async function createMicrobiologyResult(resultData) {
    return await apiCall('/microbiology', 'POST', resultData);
}

// Barcode API functions
async function generateExternalBarcodes(ownerName, animalCount) {
    return await apiCall('/barcodes/external', 'POST', {
        owner_name: ownerName,
        animal_count: animalCount
    });
}

// Statistics API functions
async function getStatistics() {
    return await apiCall('/statistics');
}

// Search API functions
async function searchByBarcode(barcode) {
    return await apiCall(`/search/barcode/${encodeURIComponent(barcode)}`);
}

// Global variables for caching
let cachedSamples = [];
let cachedAnimals = [];
let cachedOwners = [];
let cachedMicrobiologyResults = [];
let cachedStatistics = {};

// Cache refresh functions
async function refreshSamplesCache() {
    try {
        cachedSamples = await getSamples();
        return cachedSamples;
    } catch (error) {
        console.error('Error refreshing samples cache:', error);
        return [];
    }
}

async function refreshAnimalsCache() {
    try {
        cachedAnimals = await getAnimals();
        return cachedAnimals;
    } catch (error) {
        console.error('Error refreshing animals cache:', error);
        return [];
    }
}

async function refreshOwnersCache() {
    try {
        cachedOwners = await getOwners();
        return cachedOwners;
    } catch (error) {
        console.error('Error refreshing owners cache:', error);
        return [];
    }
}

async function refreshMicrobiologyCache() {
    try {
        cachedMicrobiologyResults = await getMicrobiologyResults();
        return cachedMicrobiologyResults;
    } catch (error) {
        console.error('Error refreshing microbiology cache:', error);
        return [];
    }
}

async function refreshStatisticsCache() {
    try {
        cachedStatistics = await getStatistics();
        return cachedStatistics;
    } catch (error) {
        console.error('Error refreshing statistics cache:', error);
        return {};
    }
}

// Initialize all caches
async function initializeDatabase() {
    try {
        await Promise.all([
            refreshSamplesCache(),
            refreshAnimalsCache(),
            refreshOwnersCache(),
            refreshMicrobiologyCache(),
            refreshStatisticsCache()
        ]);
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

