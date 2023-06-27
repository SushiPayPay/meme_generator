import heapq
import pickle
import requests
import os

class MemeFileManager:
    def __init__(self):
        self.max_id = None
        self.min_heap = None
        self.deserialize()

    def download_meme(self, url):
        response = requests.get(url)
        id = self.get_next_id()
        path = 'data/meme' + str(id) + '.jpg'
        if response.status_code == 200:
            with open(path, 'wb') as file:
                file.write(response.content)
            print("Image downloaded successfully.")
        else:
            print("Failed to download the image.")

    def delete_meme(self, id):
        try:
            os.remove('data/meme' + str(id) + '.jpg')
            heapq.heappush(self.min_heap, id)

            # serialize min_heap
            serialized_min_heap = pickle.dumps(self.min_heap)
            with open('data/serialized_min_heap.pkl', 'wb') as file:
                file.write(serialized_min_heap)

            return True
        except FileNotFoundError:
            return False
            
    def deserialize(self):
        # deserialize max_id
        try:
            with open('data/serialized_max_id.pkl', 'rb') as file:
                serialized_max_id = file.read()

            self.max_id = pickle.loads(serialized_max_id)
        except FileNotFoundError:
            self.max_id = 0

            # serialize max_id
            serialized_max_id = pickle.dumps(self.max_id)
            with open('data/serialized_max_id.pkl', 'wb') as file:
                file.write(serialized_max_id)

        # deserialize min_heap
        try:
            with open('data/serialized_min_heap.pkl', 'rb') as file:
                serialized_min_heap = file.read()

            self.min_heap = pickle.loads(serialized_min_heap)
        except FileNotFoundError:
            self.min_heap = []

            # serialize min_heap
            serialized_min_heap = pickle.dumps(self.min_heap)
            with open('data/serialized_min_heap.pkl', 'wb') as file:
                file.write(serialized_min_heap)

    def get_next_id(self):
        if self.min_heap == None or self.max_id == None:
            raise Exception("max_id or min_heap has not been serialized from memory")

        if len(self.min_heap) == 0:
            self.max_id += 1

            # serialize max_id
            serialized_max_id = pickle.dumps(self.max_id)
            with open('data/serialized_max_id.pkl', 'wb') as file:
                file.write(serialized_max_id)

            return self.max_id
        else:
            next_id = heapq.heappop(self.min_heap)

            # serialize min_heap
            serialized_min_heap = pickle.dumps(self.min_heap)
            with open('data/serialized_min_heap.pkl', 'wb') as file:
                file.write(serialized_min_heap)

            return next_id
