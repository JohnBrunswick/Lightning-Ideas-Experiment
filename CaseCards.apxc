public class CaseCards {
    
    // The following could be reduced by quite a bit - but done to quickly get testing data
    
    @AuraEnabled
    public static List<Idea> getIdeas() {
        return [SELECT Body,Categories,CommunityId,CreatedById,CreatedDate,CreatorFullPhotoUrl,CreatorName,CreatorSmallPhotoUrl,
                Id,IsDeleted,IsHtml,IsMerged,LastCommentDate,LastCommentId,LastModifiedById,LastModifiedDate,LastReferencedDate,
                LastViewedDate,NumComments,ParentIdeaId,RecordTypeId,Status,SystemModstamp,Title,VoteScore,VoteTotal FROM Idea];
    }
    
    @AuraEnabled
    public static Idea getIdea(String objectId) {
        return [SELECT Body,Categories,CommunityId,CreatedById,CreatedDate,CreatorFullPhotoUrl,CreatorName,CreatorSmallPhotoUrl,
                Id,IsDeleted,IsHtml,IsMerged,LastCommentDate,LastCommentId,LastModifiedById,LastModifiedDate,LastReferencedDate,
                LastViewedDate,NumComments,ParentIdeaId,RecordTypeId,Status,SystemModstamp,Title,VoteScore,VoteTotal FROM Idea WHERE Id = :objectId];
    }    
    
    @AuraEnabled
    public static List<IdeaComment> getComments(String objectId) {
        return [SELECT CommentBody,CommunityId,CreatedById,CreatedDate,CreatorFullPhotoUrl,CreatorName,CreatorSmallPhotoUrl,
                Id,IdeaId,IsDeleted,IsHtml,SystemModstamp,UpVotes FROM IdeaComment WHERE IdeaId = :objectId ORDER BY CreatedDate ASC];
    }
    
    @AuraEnabled
    public static Idea createIdea(Idea newIdea)
    {        
        upsert newIdea;
        
        // Temp fix to get full data back for the new item 
        // by default only the attributes sent to the upsert are returned - we need more for the UI
        return [SELECT Body,Categories,CommunityId,CreatedById,CreatedDate,CreatorFullPhotoUrl,CreatorName,CreatorSmallPhotoUrl,
                Id,IsDeleted,IsHtml,IsMerged,LastCommentDate,LastCommentId,LastModifiedById,LastModifiedDate,LastReferencedDate,
                LastViewedDate,NumComments,ParentIdeaId,RecordTypeId,Status,SystemModstamp,Title,VoteScore,
                VoteTotal FROM Idea WHERE Id = :newIdea.Id];
        
    }
    
    
    @AuraEnabled
    public static Vote createVote(String parentId, String voteType)
    {
        Vote myVote = new Vote();
        myVote.ParentId = parentId;
        myVote.Type = voteType;
        insert myVote;
        return myVote;
    }    
    
    @AuraEnabled
    public static List<Vote> getIdeaVotes(String parentId)
    {
        return [SELECT CreatedById,CreatedDate,Id,IsDeleted,ParentId,SystemModstamp,Type FROM Vote Where ParentId = :parentId];
    }
    
    
    @AuraEnabled
    public static IdeaComment createIdeaComment(IdeaComment newIdeaComment, String ideaId)
    {
        
        IdeaComment iComm = new IdeaComment();
        iComm.IdeaId = ideaId;
        iComm.CommentBody = newIdeaComment.CommentBody;
        insert iComm;
        
        // Temp fix to get full data back for the new item 
        // by default only the attributes sent to the upsert are returned - we need more for the UI
        return [SELECT CommentBody,CommunityId,CreatedById,CreatedDate,CreatorFullPhotoUrl,
                CreatorName,CreatorSmallPhotoUrl,Id,IdeaId,IsDeleted,IsHtml,SystemModstamp,UpVotes 
                FROM IdeaComment WHERE Id = :iComm.Id];
        
    }    

    @AuraEnabled
    public static String getProfilePhoto()
    {
        User u = [Select u.FirstName, u.LastName, u.SmallPhotoUrl, u.FullPhotoUrl From User u where u.id=:UserInfo.getUserId()];
        return u.FullPhotoUrl;
    }    
    
}